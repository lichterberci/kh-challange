// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '../../prisma/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

interface IUserSignupData {
	oauthId: string;
	numberPlate: string;
	hasOwnParkingSlot: boolean;
	ownParkingSlotReadableId: string | undefined;
}

export default async function CreateUser(
	req: NextApiRequest,
	res: NextApiResponse
) {
		
	if (req.method != "POST")		
		return res.status(405).send("Bad method!");
		
	const userData: IUserSignupData = req.body;

	if (!userData)
		return res.status(400).send("Body required!");

	const oauthId = userData.oauthId;

	if (!oauthId)
		return res.status(400).send("Oauth ID required!");

	const createdEmployee = await prisma.employee.create({
		data: {
			doesOwnSpot: userData.hasOwnParkingSlot,
			ownedSpot: {
				connect: {
					readableId: userData.ownParkingSlotReadableId
				}
			},
			carNumberPlate: userData.numberPlate,
			oauthId: userData.oauthId
		}
	});

	if (!createdEmployee)
		return res.status(500).send("Could not create employee!");
}
	