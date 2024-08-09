import { OnClickType, Prisma, PrismaClient, WidgetType } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { redisClient } from "../../shared/cache/redis";

interface OnClick {
	type: OnClickType;
	value: string;
}

interface Component {
	type: WidgetType;
	position: number;
	variant?: string;
	value?: string;
	children?: Component[];
	onclick?: OnClick;
}

interface InsertComponentsBody {
	siteId: string;
	components: Component[];
}

export class WidgetService {
	private db: PrismaClient;

	constructor() {
		this.db = new PrismaClient();
	}

	async getSites() {

		if (redisClient.isOpen) {
			const widgets = await redisClient.get('site1');

			if (widgets) {
				return {
					'components': JSON.parse(widgets)
				};
			}
		}


		const site = await this.db.site.findFirst({
			where: {
				domain: "Site 1",
			},
			select: {
				id: true,
				widgets: {
					where: {
						parentId: null
					},
					select: {
						id: true,
						type: true,
						position: true,
						variant: true,
						value: true,
						children: true,
					}
				}
			}
		});


		if (!site) {
			return [];
		}

		const widgets = site.widgets;

		const allWidgets = await this.fetchAllWidgets(site.id)

		const widgetsMap = new Map(allWidgets.map(widget => [widget.id, widget]));

		for (const widget of widgets) {
			widget.children = this.getChildren(widget.id, widgetsMap);
		}

		redisClient.set('site1', JSON.stringify(widgets));

		return {
			'components': widgets
		};
	}

	async fetchAllWidgets(siteId: string) {
		return await this.db.widget.findMany({
			where: {
				siteId: siteId
			},
			select: {
				id: true,
				type: true,
				position: true,
				variant: true,
				value: true,
				parentId: true,
			}
		})
	}

	private getChildren(parentId: string, widgetMap: Map<string, any>): any[] {
		// Get direct children
		const children = Array.from(widgetMap.values()).filter(widget => widget.parentId === parentId);

		// Recursively assign children
		for (const child of children) {
			child.children = this.getChildren(child.id, widgetMap);
		}

		return children;
	}


	async updateSite(data: any) {
		// delete all widget of this site
		await this.db.widget.deleteMany({
			where: {
				siteId: data.siteId
			}
		})

		const { siteId, components } = data;

		const widgets: Prisma.WidgetCreateManyInput[] = [];
		const widgetMap = new Map<string, Prisma.WidgetCreateManyInput>(); // To keep track of widget data
		const onClicks: Prisma.OnClickCreateManyInput[] = [];

		function flattenComponents(parentId: string | null, components: Component[]) {
			components.forEach((component, index) => {
				const id = uuidv4();
				const widgetData: Prisma.WidgetCreateManyInput = {
					id,
					siteId: siteId,
					type: component.type,
					position: component.position,
					variant: component.variant,
					value: component.value,
					parentId: parentId || null,
				};

				widgetMap.set(id, widgetData);
				widgets.push(widgetData);

				if (component.children) {
					flattenComponents(id, component.children);
				}

				if (component.onclick) {
					onClicks.push({
						widgetId: id,
						type: component.onclick.type,
						value: component.onclick.value
					});
				}
			});
		}

		flattenComponents(null, components);

		await this.db.widget.createMany({
			data: widgets,
		});

		await this.db.onClick.createMany({
			data: onClicks,
		});
	}
}
