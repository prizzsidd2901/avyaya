/* ============================================================
   BRAND AID — Contact Message Model
   ============================================================ */

class ContactMessage {
  constructor({ name, email, message }) {
    this.id         = Date.now().toString() + Math.random().toString(36).slice(2, 6);
    this.name       = name.trim();
    this.email      = email.trim().toLowerCase();
    this.message    = message.trim();
    this.receivedAt = new Date().toISOString();
    this.read       = false;
    this.replied    = false;
  }
}

module.exports = ContactMessage;


/* ============================================================
   MONGOOSE SCHEMA (uncomment when using MongoDB)
   
   const mongoose = require('mongoose');
   
   const contactSchema = new mongoose.Schema({
     name     : { type: String, required: true, trim: true },
     email    : { type: String, required: true, lowercase: true, trim: true },
     message  : { type: String, required: true },
     read     : { type: Boolean, default: false },
     replied  : { type: Boolean, default: false }
   }, { timestamps: true });
   
   module.exports = mongoose.model('ContactMessage', contactSchema);
   ============================================================ */
