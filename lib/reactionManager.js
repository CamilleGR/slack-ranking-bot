
// var addReactionPoint = function(db, user, type, callback){
//
// }

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

var addUserReaction = function(db, type, user){
  return new Promise(function(resolve,reject){
    db.collection("reactions").update({name:type},{$push: {scores:{name:user, pts:1}}})
      .toArray(function(err,docs){
        if(err != null || docs == null) reject(err);
        if(docs != null && docs.length === 0) resolve(false)
        else resolve(true)
      })
  })
}

module.exports =
                {
                  isReactionExist : isReactionExist,
                  isUserReactionExist: isUserReactionExist,
                  addUserReaction: addUserReaction
                };
