import { Request, Response } from 'express';
import Photo from '../models/Photo';
import fs from 'fs';

export const index = async (req: Request, res: Response): Promise<Response> => {
	const photos = await Photo.find();
	return res.status(200).json(photos);
};

export const store = async (req: Request, res: Response) => {
	const { title, description } = req.body;
	const newPhoto = new Photo({
		title,
		description,
		imagePath: req.file?.path,
	});
	const photo = await newPhoto.save();
	return res.status(201).json({
		message: 'Photo saved successfully',
		photo,
	});
};

export const show = async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;
	const photo = await Photo.findById(id);
	return res.status(201).json(photo);
};

export const update = async (req: Request, res: Response): Promise<Response> => {
	const { title, description } = req.body;
	const { id } = req.params;
	console.log(req.body);
	const photo = await Photo.findByIdAndUpdate(
		id,
		{
			title,
			description,
		},
		{ new: true }
	);
	return res.status(200).json({
		message: 'Photo updated successfully',
		photo,
	});
};

export const remove = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const photo = await Photo.findByIdAndDelete(id);
	if (photo) {
		fs.unlink(photo.imagePath, (err) => {
			if (err) {
				console.error(err);
				return;
			}

			//file removed
			return res.status(200).json({
				message: 'Photo deleted successfully',
				photo,
			});
		});
	}
};

export const sample = (req: Request, res: Response) => {
	return res.status(201).json({
		message: 'Photo saved successfully',
	});
};
