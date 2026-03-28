/* ============================================================
   BRAND AID — Vote Model
   ============================================================ */

class Vote {
  constructor({ teamId, voterIp }) {
    this.id       = Date.now().toString() + Math.random().toString(36).slice(2, 6);
    this.teamId   = Number(teamId);
    this.voterIp  = voterIp || '';
    this.castAt   = new Date().toISOString();
  }
}

module.exports = Vote;


/* ============================================================
   MONGOOSE SCHEMA (uncomment when using MongoDB)
   
   const mongoose = require('mongoose');
   
   const voteSchema = new mongoose.Schema({
     teamId   : { type: Number, required: true },
     voterIp  : { type: String, required: true },
     castAt   : { type: Date,   default: Date.now }
   });
   
   module.exports = mongoose.model('Vote', voteSchema);
   ============================================================ */
