import { Request, Response, Router } from "express";
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailler-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';


const routes: Router = Router()



routes.post('/feedbacks', async (request:Request, response: Response)=>{
	const prismaFeedbacksRepository: PrismaFeedbacksRepository = new PrismaFeedbacksRepository()
	const nodemailerMailAdapter: NodemailerMailAdapter = new NodemailerMailAdapter()

	const submitFeedbackUseCase: SubmitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter)

	await submitFeedbackUseCase.execute({
		type: request.body.type,
		comment: request.body.comment,
		screenshot: request.body.screenshot,
	})


	
	return response.status(201).send()
})

export { routes };
