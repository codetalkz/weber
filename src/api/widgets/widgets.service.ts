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
					domain: 'domain.com'
				},
				select: {
					widgets: {
						where: {
							children: {
								some: {}
							}
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


}
