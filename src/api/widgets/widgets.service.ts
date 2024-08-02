import { PrismaClient } from "@prisma/client";

export class WidgetService {
	private db: PrismaClient;

	constructor() {
		this.db = new PrismaClient();
	}

	async getSites() {
		try {
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
		} catch (error) {
			console.log(error);
		}
	}

    async updateSite(data: any) {
	return 'a'
    }
}
