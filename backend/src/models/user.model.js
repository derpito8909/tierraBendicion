import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - password
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         fullname:
 *           type: string
 *           description: The user's full name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         category:
 *           type: string
 *           description: The user's category
 *         image:
 *           type: string
 *           description: The user's profile image
 *       example:
 *         id: d5fE_asz
 *         fullname: John Doe
 *         email: johndoe@example.com
 *         password: secret
 *         category: admin
 *         image: "https://example.com/image.jpg"
 */

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export const userModel = mongoose.model("user", userSchema);
