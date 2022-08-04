import { prisma } from "../../prisma";
import { FeedBacksRepositoty, FeedbackCreateData } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedBacksRepositoty{
	async create (data: FeedbackCreateData) {
		await prisma.feedback.create({
			data: {
				type: data.type,
				comment: data.comment,
				screenshot: data.screenshot
			}
		})
	};
}