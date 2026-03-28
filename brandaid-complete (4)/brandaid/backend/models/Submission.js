/* ============================================================
   BRAND AID — Submission Model
   ============================================================ */

class Submission {
  constructor({ teamName, email, slogan, type, filePath }) {
    this.id          = Date.now().toString() + Math.random().toString(36).slice(2, 6);
    this.teamName    = (teamName || 'Anonymous').trim();
    this.email       = (email    || '').trim().toLowerCase();
    this.slogan      = (slogan   || '').trim();
    this.type        = type      || 'Slogan'; // Poster | Video Ad | Marketing Plan | Slogan
    this.filePath    = filePath  || null;     // path after file upload
    this.submittedAt = new Date().toISOString();
    this.reviewed    = false;
    this.score       = null;
  }
}

module.exports = Submission;


/* ============================================================
   MONGOOSE SCHEMA (uncomment when using MongoDB)
   
   const mongoose = require('mongoose');
   
   const submissionSchema = new mongoose.Schema({
     teamName    : { type: String, default: 'Anonymous' },
     email       : { type: String, lowercase: true, trim: true },
     slogan      : { type: String, default: '' },
     type        : { type: String, enum: ['Poster','Video Ad','Marketing Plan','Slogan'], default: 'Slogan' },
     filePath    : { type: String, default: null },
     reviewed    : { type: Boolean, default: false },
     score       : { type: Number, default: null }
   }, { timestamps: true });
   
   module.exports = mongoose.model('Submission', submissionSchema);
   ============================================================ */
