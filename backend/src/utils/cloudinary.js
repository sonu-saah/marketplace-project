import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // Taaki .env file se keys properly load ho jayein

// Cloudinary ko aapki API keys se connect karna
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Photo upload karne ka function
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // Cloudinary par upload kar rahe hain
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        
        // Upload successful hone ke baad temporarily save ki hui file delete kar do
        fs.unlinkSync(localFilePath); 
        return response;
        
    } catch (error) {
        // Agar upload fail ho jaye, tab bhi file delete kar do taaki storage na bhare
        if(fs.existsSync(localFilePath)){
           fs.unlinkSync(localFilePath); 
        }
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
}

export { uploadOnCloudinary };