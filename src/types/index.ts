export type UserType = {
	Username: string;
	Password: string;
};

export type Input = {
	type: string;
	placeholder: string;
	value?: string;
};

export type UserDb = {
	Id: number;
	Username: string;
	Password: string;
	CreateTime: Date;
};
