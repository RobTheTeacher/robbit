'use server'
import {v4 as uuid} from 'uuid'

import { createClient } from "@/utils/supabase/server-client"

export const UploadImage = async (image: File | string) => {
    if (typeof image === "string")
        return;
    const supabase = await createClient()

    const imageName = image.name.split('.')
    const imagePath = `${imageName[0]}-${uuid()}-${imageName[1]}`;

    const {data, error} = await supabase.storage.from('images').upload(imagePath, image)

    if (error) {throw error}

    const {data: {publicUrl}} = await supabase.storage.from('images').getPublicUrl(data.path)

    return publicUrl
}