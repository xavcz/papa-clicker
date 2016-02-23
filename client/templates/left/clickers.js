Template.clickers.helpers({
  clickers: function(){
    let cursorBonusId   = Template.instance().cursorBonusId;
    let ownedCursor     = Belongings.findOne({userId: Meteor.userId(), belongingId: cursorBonusId});
    if(ownedCursor !== "undefined"){
      let userCursors = ownedCursor.amount;
      let returnArr       = [];
      for (let i = 0; i < userCursors; i++) {
        returnArr.push({});
      };
      return returnArr;
    }
  }
});

Template.clickers.onCreated(function(){
  //JJT | Do we really need this here?
  this.cursorBonusId = Bonus.findOne({name: 'Cursor'})._id;
});

Template.clickers.onRendered(function () {
  let firstClicker = this.$('.clicker').first();
  setInterval(function(){
    var currentClicker = this.$('.clicker.current');
    currentClicker.removeClass("current");
    let nextClicker = currentClicker.next();
    if(nextClicker.length == 0){
      nextClicker = firstClicker;
    }
    nextClicker.addClass("current").animate({"height":"20px"}).animate({"height":"12px"});
  },1000);
});