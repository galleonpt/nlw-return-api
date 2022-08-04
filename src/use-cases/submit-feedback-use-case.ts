import { MailAdapter } from "../adapters/mail-adapter";
import { FeedBacksRepositoty } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
	type:string;
	comment: string;
	screenshot?: string;
}

export class SubmitFeedbackUseCase{
	constructor(
		private feedbackRepository: FeedBacksRepositoty,
		private mailAdapter: MailAdapter
	){}

	async execute(request: SubmitFeedbackUseCaseRequest){

		if (!request.type) {
      throw new Error('Type is required.');
    }

    if (!request.comment) {
      throw new Error('Comment is required.');
    }

    if (request.screenshot && !request.screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

		await this.feedbackRepository.create({
			type: request.type,
			comment: request.comment,
			screenshot: request.screenshot
		})

		await this.mailAdapter.sendMail({
			subject: 'New feedback',
			body:[
				`<p>Type: ${request.type}</p>`,
				`<p>Comment: ${request.comment}</p>`,
			].join('\n')
		})
	}
}