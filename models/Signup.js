// models/Signup.js
import mongoose from 'mongoose';

const SignupSchema = new mongoose.Schema({
    email: { type: String, required: true },
});

export default mongoose.models.Signup || mongoose.model('Signup', SignupSchema);