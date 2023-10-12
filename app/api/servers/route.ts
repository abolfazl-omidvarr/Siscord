import {NextResponse} from "next/server";
import {MemberRole} from '@prisma/client'

import {currentProfile} from "@/lib/current-profile";
import {prisma} from "@/lib/prisma";
import {v4 as uuid} from 'uuid'

export async function POST(req: Request) {
    try {
        const {name, imageUrl} = await req.json()
        const profile = await currentProfile()

        if (!profile) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const server = await prisma.server.create({
            data: {
                name,
                imageUrl,
                profileId: profile.id,
                inviteCode: uuid(),
                Channel: {
                    create: [{
                        name: 'general',
                        profileId: profile.id
                    }]
                },
                Member:{
                    create: [
                        {
                            profileId: profile.id,
                            role:MemberRole.ADMIN
                        }
                    ]
                }

            }
        })

        return NextResponse.json(server)
    } catch (err) {
        console.log('[SERVER_POST]', err)
        return new NextResponse('Internal error', {status: 500})
    }
}