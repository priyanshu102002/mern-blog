import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
    },
    categories: {
        type: String,
        default: "uncategorized"
    },
    slug: {
        type: String,
        required: true,
    }
}, { timestamps: true })

export const Post = mongoose.model("Post", postSchema);