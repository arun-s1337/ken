import db from "../config/db.js"

export  async function addTestimonial({ adminId,patient_name,content }){
    const [ result ] = await db.execute(
        `INSERT INTO testimonial (admin_id,patient_name,content,created_at,updated_at) VALUES (?, ?, ?,NOW(),NOW())`,
        [adminId,patient_name,content]

    )

    return result.affectedRows>0
}

export async function getReviews(params) {
    
}

export async function getTestimonials(){
    const [ result ] = db.execute(
        `SELECT *  FROM testimonial ORDER BY created_at DESC`
    )
    return result
}