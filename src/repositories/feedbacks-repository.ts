export interface FeedbackCreateData{
	type:string;
	comment: string;
	screenshot?: string
}

export interface FeedBacksRepositoty{
	create : (data: FeedbackCreateData) => Promise<void>
}