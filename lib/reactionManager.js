

var getReaction = function getReaction(db,type){
  return new Promise(function(resolve, reject){
       db.collection("reactions").find({name:type}).toArray(function(err,docs){
         if(err != null || docs == null) reject(err)
         else resolve(docs)
       })
     })
}

 var incReactionPoint =  function(db, type, user){
  return new Promise(function(resolve,reject){
    db.collection("reactions").update({name:type,'scores.name':user},{$inc: {'scores.$.pts':1}},
      function(err,docs){
       if(err != null || docs == null || docs.result.ok != 1) reject(err);
       if(docs != null && docs.result.nModified >= 1) resolve(true)
       else resolve(false)
      })
  })
}

var addReactionPoint = function(db,type,user){
  return new Promise(function(resolve,reject){
    isReactionExist(db,type).then(function(reactionExist){
      if(reactionExist){
        isUserReactionExist(db,type,user).then(function(UserReactionExist){
          if(UserReactionExist) incReactionPoint(db,type,user).then(function(result){resolve(result)}).catch(function(err){reject(err)})
          else  addUserReaction(db,type,user).then(function(result){resolve(result)}).catch(function(err){reject(err)})
        }).catch(function(err){reject(err)})
      }
      else{
        addReaction(db,type).then(function(reactionAdded){
          if(reactionAdded)addReactionPoint(db,type,user)
          else resolve(false)
        }).catch(function(err){reject(err)})
      }
      resolve(true);
    })
  })
}

var decReactionPoint =  function(db, type, user){
 return new Promise(function(resolve,reject){
   db.collection("reactions").update({name:type,'scores.name':user},{$inc: {'scores.$.pts':-1}},
     function(err,docs){
      if(err != null || docs == null || docs.result.ok != 1) reject(err);
      if(docs != null && docs.result.nModified >= 1) resolve(true)
      else resolve(false)
     })
 })
}

function isReactionExist(db, type){
  return new Promise(function(resolve, reject){
       db.collection("reactions").find({name:type}).toArray(function(err,docs){
         if(err != null || docs == null) reject(err);
         if(docs != null && docs.length === 0) resolve(false)
         else resolve(true)
       })
     })
}

var isUserReactionExist = function(db, type, user){
  return new Promise(function(resolve,reject){
    db.collection("reactions").find({name:type, scores: {$elemMatch: {name:user}}})
      .toArray(function(err,docs){
        if(err != null || docs == null) reject(err);
        if(docs != null && docs.length === 0) resolve(false)
        else resolve(true)
      })
  })
}

var addReaction = function(db, type){
  return new Promise(function(resolve,reject){
    db.collection("reactions").insert({name:type, scores:[]},
       function(err,docs){
        if(err != null || docs == null || docs.result.ok != 1) reject(err);
        if(docs.result.n == 0) resolve(false)
        else resolve(true)
      })
  })
}

var addUserReaction = function(db, type, user){
  return new Promise(function(resolve,reject){
    db.collection("reactions").update({name:type},{$push: {scores:{name:user, pts:1}}},
       function(err,docs){
        if(err != null || docs == null || docs.result.ok != 1) reject(err);
        if(docs != null && docs.result.nModified >= 1) resolve(true)
        else resolve(false)
      })
  })
}



module.exports =
                {
                  getReaction: getReaction,
                  incReactionPoint: incReactionPoint,
                  decReactionPoint: decReactionPoint,
                  addReactionPoint: addReactionPoint,
                  isReactionExist : isReactionExist,
                  isUserReactionExist: isUserReactionExist,
                  addReaction: addReaction,
                  addUserReaction: addUserReaction
                };
