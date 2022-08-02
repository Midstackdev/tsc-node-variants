import mongoose, { Document, Schema } from 'mongoose';

export interface IPhoto {
	title: string;
	description: string;
	imagePath: string;
}

export interface IPhotoModel extends IPhoto, Document {}

const PhotoSchema: Schema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		imagePath: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IPhotoModel>('Photo', PhotoSchema);
