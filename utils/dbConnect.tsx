export const mongoConnect = async () => {
  try {
    const mongoose = (await import('mongoose')).default;
    await mongoose.connect(process.env.CONNECTION_URL!)
    console.log('connected successfully');
  } catch (error:any) {
    //  setTimeout(mongoConnect, 3000);
     console.log(error.message);
  }
};