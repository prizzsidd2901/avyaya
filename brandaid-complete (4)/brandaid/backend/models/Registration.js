/* ============================================================
   BRAND AID — Registration Model
   
   This is a plain JS class for in-memory use.
   For MongoDB, install mongoose and use the schema below.
   ============================================================ */

/* ── IN-MEMORY MODEL (default) ── */
class Registration {
  constructor({ teamName, college, course, phone, members, email }) {
    this.id          = Date.now().toString() + Math.random().toString(36).slice(2, 6);
    this.teamName    = teamName.trim();
    this.college     = college.trim();
    this.course      = course.trim();
    this.phone       = phone.trim();
    this.members     = Array.isArray(members)
      ? members.map(m => m.trim())
      : members.split(',').map(m => m.trim());
    this.email       = email.trim().toLowerCase();
    this.registeredAt = new Date().toISOString();
    this.status      = 'pending'; // pending | confirmed | disqualified
    this.paymentDone = false;
  }
}

module.exports = Registration;


/* ============================================================
   MONGOOSE SCHEMA (uncomment when using MongoDB)
   
   const mongoose = require('mongoose');
   
   const registrationSchema = new mongoose.Schema({
     teamName    : { type: String, required: true, unique: true, trim: true },
     college     : { type: String, required: true, trim: true },
     course      : { type: String, required: true },
     phone       : { type: String, required: true },
     members     : [{ type: String }],
     email       : { type: String, required: true, lowercase: true, trim: true },
     status      : { type: String, enum: ['pending','confirmed','disqualified'], default: 'pending' },
     paymentDone : { type: Boolean, default: false }
   }, { timestamps: true });
   
   module.exports = mongoose.model('Registration', registrationSchema);
   ============================================================ */
