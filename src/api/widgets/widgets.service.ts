import { Prisma, PrismaClient, WidgetType } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

interface Component {
	type: WidgetType;
	position: number;
	variant?: string;
	value?: string;
	children?: Component[];
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
		const site = await this.db.site.findFirst({
			where: {
				domain: "Site 1",
			},
			select: {
				widgets: {
					where: {
						parentId: null,
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
		return site;
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

		function flattenComponents(parentId: string | null, components: Component[]) {
			components.forEach((component, index) => {
				const id = uuidv4();
				const widgetData: Prisma.WidgetCreateManyInput = {
					id,
					siteId: parentId ? null : siteId,
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
			});
		}

		flattenComponents(null, components);

		await this.db.widget.createMany({
			data: widgets,
		});
	}
}
