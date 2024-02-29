import supabase, { supabaseUrl } from "./supabase";

export async function getCabins(){

    let { data, error } = await supabase.from('cabins').select('*')
    if(error){
        console.error(error);
        throw new Error("Cabins could not be loaded")
    }
    return data;
}

export async function createEditCabin(newCabin, id){
    const hasImagePath = typeof newCabin.image === 'string' && newCabin.image.startsWith(supabaseUrl);

    console.log(hasImagePath);
    let imageName=""
    if(!hasImagePath)
     imageName=`${Math.random()}-${newCabin.image.name}`.replaceAll('/', "");
    // console.log(imageName);

    const imagePath=hasImagePath? newCabin.image: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    console.log(imagePath)

    //create Cabin

    let query=supabase.from('cabins');
    if(!id)
    query=query.insert([{...newCabin, image: imagePath}])

    if(id)
       query= query.update({...newCabin, image: imagePath})
        .eq('id', id)
        .select()

    const {data, error}=await query.select();
    if(error){
        console.error(error);
        throw new Error('Cabin could not be Created');
    }


    //Upload Image to the bucket
    if(!hasImagePath){
    const { error: storageError } = await supabase
      .storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);
      if(storageError){
         await supabase
        .from('cabins')
        .delete()
        .eq('id', data[0].id);
        console.error(storageError);
        throw new Error('Cabin image could not be uploaded');

      }
    }
    return data;
}


export async function deleteCabin(id){
    
const { data, error } = await supabase
.from('cabins')
.delete()
.eq('id', id);
if(error){
    console.error(error);
    throw new Error('Cabin could not be deleted');
}
return data
}