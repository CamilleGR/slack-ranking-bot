const winston = require('winston')
winston.level = process.env.LOG_LEVEL


let getReaction = function getReaction(db,type){
  return new Promise((resolve, reject)=>{
       db.collection("reactions").find({name:type}).toArray((err, docs)=>{
         if(err != null || docs == null) reject(err)
         else resolve(docs)
       })
     })
}

let getUserReactions = function getUserReactions(db,userId){
  return new Promise((resolve, reject)=>{
       db.collection("reactions")
        .find({scores: {$elemMatch: {name: userId}}},{name:1,scores: {$elemMatch: {name:userId}}}).toArray((err, docs)=>{
         if(err != null || docs == null) reject(err)
         else resolve(docs)
       })
     })
}

 let incReactionPoint =  function(db, type, user){
  return new Promise((resolve, reject)=>{
    db.collection("reactions").update({name:type,'scores.name':user},{$inc: {'scores.$.pts':1}},
      (err, docs)=>{
       if(err != null || docs == null || docs.result.ok != 1) reject(err);
       if(docs != null && docs.result.nModified >= 1) resolve(true)
       else resolve(false)
      })
  })
}

let addReactionPoint = function(db,type,user){
  return new Promise((resolve, reject)=>{
    isReactionExist(db,type).then((reactionExist)=>{
      if(reactionExist){
        winston.debug('[DEBUG] REACTION EXIST, TEST USER REACTION EXISTENCE')
        isUserReactionExist(db,type,user).then(function(UserReactionExist){
          if(UserReactionExist) incReactionPoint(db,type,user).then(function(result){resolve(result)}).catch(function(err){reject(err)})
          else  addUserReaction(db,type,user).then(function(result){resolve(result)}).catch(function(err){reject(err)})
          winston.debug('[DEBUG] REACTION POINTS ADDED')
        }).catch(function(err){reject(err)})
      }
      else{
        winston.debug('[DEBUG] REACTION DOES NOT EXIST, ADD REACTION')
        addReaction(db,type).then((reactionAdded)=>{
          if(reactionAdded)addReactionPoint(db,type,user)
          else resolve(false)
        }).catch(function(err){reject(err)})
      }
      winston.debug('[DEBUG] REACTION POINTS ADDED')
      resolve(true);
    })
  })
}

let decReactionPoint =  function(db, type, user){
 return new Promise((resolve, reject)=>{
   db.collection("reactions").update({name:type,'scores.name':user},{$inc: {'scores.$.pts':-1}},
     (err, docs)=>{
      if(err != null || docs == null || docs.result.ok != 1) reject(err);
      if(docs != null && docs.result.nModified >= 1) resolve(true)
      else resolve(false)
     })
 })
}

function isReactionExist(db, type){
  return new Promise((resolve, reject)=>{
       db.collection("reactions").find({name:type}).toArray((err, docs)=>{
         if(err != null || docs == null) reject(err);
         if(docs != null && docs.length === 0) resolve(false)
         else resolve(true)
       })
     })
}

let isUserReactionExist = function(db, type, user){
  return new Promise((resolve, reject)=>{
    db.collection("reactions").find({name:type, scores: {$elemMatch: {name:user}}})
      .toArray((err, docs)=>{
        if(err != null || docs == null) reject(err);
        if(docs != null && docs.length === 0) resolve(false)
        else resolve(true)
      })
  })
}

let addReaction = function(db, type){
  return new Promise((resolve, reject)=>{
    db.collection("reactions").insert({name:type, scores:[]},
       (err, docs)=>{
        if(err != null || docs == null || docs.result.ok != 1) reject(err);
        if(docs.result.n == 0) resolve(false)
        else resolve(true)
      })
  })
}

let addUserReaction = function(db, type, user){
  return new Promise((resolve, reject)=>{
    db.collection("reactions").update({name:type},{$push: {scores:{name:user, pts:1}}},
       (err, docs)=>{
        if(err != null || docs == null || docs.result.ok != 1) reject(err);
        if(docs != null && docs.result.nModified >= 1) resolve(true)
        else resolve(false)
      })
  })
}



module.exports =
                {
                  getReaction: getReaction,
                  getUserReactions : getUserReactions,
                  incReactionPoint: incReactionPoint,
                  decReactionPoint: decReactionPoint,
                  addReactionPoint: addReactionPoint,
                  isReactionExist : isReactionExist,
                  isUserReactionExist: isUserReactionExist,
                  addReaction: addReaction,
                  addUserReaction: addUserReaction
                };
