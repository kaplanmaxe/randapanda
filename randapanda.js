Vimeo_videos = new Mongo.Collection('randa_vimeo_videos');
Router.route('/videos/:key', {                                                                            
    name: 'key',                                                                                       
    path: '/videos/:key',                                                                                 
    template: 'next_video',                                                                                   
    onBeforeAction: function () {                                                                             
       Session.set('vimeo_id', this.params.key);                                                                 
    }                                                                                                         
});
Router.route('/', {

});
if (Meteor.isClient) {

  Session.setDefault('medium','vimeo');
 //initialize number of videos
  played.counter=0;
  //keeps track of the number of videos played
  function played() { 
    played.counter++;
    return played.counter;
  }
  function toggleShare(status) {
    //on
    if (status === 0) {
      //show the div block
      document.getElementById('sharer').style.display='inline-block';
      //hide the button
      document.getElementById('toggleShare').style.display='none';
    }
    //off
    else if (status === 1) {
      //hide the div block
      document.getElementById('sharer').style.display='none';
    }
    return 0;
  }
  Meteor.startup(function() {
    //start off with 10 videos loaded to the client
    var handle = Meteor.subscribeWithPagination("videoId", 10);
    //get the number of videos on startup
    Meteor.call("count", function(error, result) {
      Session.set('video_count',result);
    });
    toggleShare(1);
  });

 
  //gets the next video
  Meteor.methods({
    nextVideo: function(medium) {
      //0 youtube 1 vimeo
      played();
      var limit = 30;
      var handle = Meteor.subscribeWithPagination("videoId", limit);
      var video_id;
      if(medium==1) {
        var count = Vimeo_videos.find().count();
      }
      if(count>0) {
        var random_id = Math.floor(Math.random() * count);
        var video_info = Vimeo_videos.find({}).fetch();
        videoId = video_info[random_id].randa_id;
      }
      else {
        videoId = "error";
      }
      window.location = "/videos/" + videoId;
      //Session.set('vimeo_id',videoId);
    }
  });
  
  Template.select.events({
    'change #medium': function() {
      var medium = document.getElementById("medium").value;
      Session.set('medium',medium);
    }
  });

  Template.welcome_text.events({
    'click #getStarted': function() {
      Meteor.call('nextVideo',1);
    }
  });

  Template.meta_url.helpers({
    vimeo_id: function() {
      return Session.get('vimeo_id');
    } 
  });

  Template.video_player.helpers({
    counter: function () {
      return Session.get('counter');
    },
    medium: function() {
      return Session.get('medium');
    },
    vimeo_id: function() {
      return Session.get('vimeo_id');
    }
  });

  Template.video_count.helpers({
    video_count: function() {
      
      return numberWithCommas(Session.get("video_count"));
    }
  });

  Template.next_video.events({
    'click #next': function() {
      Meteor.call('nextVideo',1);
    }
  });
  
  Template.next_video.helpers({
    button_text: function() {
      var button_text;
      if (Session.get('vimeo_id')!= undefined) {
        button_text = "Next Video!";
      }
      
      return button_text;
    }
  });

  Template.toggleShare.events({
    'click #toggleShare': function() {
      toggleShare(0);
    }
  });

  Template.toggleShare.helpers({
    vimeo_id: function() {
      return Session.get('vimeo_id');
    } 
  });

  Template.home_button.events({
    'click #home': function() {
      window.location = "/";
    }
  });
  Template.hashtag.events({
    'click #hashtag': function() {
      window.location = "/";
    }
  });
  //Google AdSense
  // Template.MyAds.onRendered(function() {
  //   $.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function() {
  //     var ads, adsbygoogle;
  //     ads = '<!-- RandaPanda --> <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9973023863045617" data-ad-slot="7349945680" data-ad-format="auto"></ins>';
  //     $('.leaderboard').html(ads);
  //     return (adsbygoogle = window.adsbygoogle || []).push({});
  //   });
  // });

  // Template.adsense.onRendered(function() {
  //   (adsbygoogle = window.adsbygoogle || []).push({});
  // });

  //Google Analytics
  Template.googleAnalytics.onRendered(function() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-65972545-1', 'auto');
    ga('send', 'pageview');
  });

}

if (Meteor.isServer) {

  Meteor.methods({
    nextVideo: function(medium) {
      check(medium, Number);
      //0 youtube 1 vimeo
      var video_id;
      if(medium==1) {
        var count = Vimeo_videos.find().count();
      }
      if(count>0) {
        var random_id = Math.floor(Math.random() * count) + 1;
        var video_info = Vimeo_videos.find({key: random_id}, {limit: 1}).fetch();
        
        videoId = video_info[0].randa_id;
      }
      else {
        videoId = "error";
      }
      return videoId;
    }
  });
  //Paginated publish
  Meteor.publish('videoId', function(limit) {
    var keys=[];
    var count = Vimeo_videos.find().count();
    if (limit>1) {
      for (i=0;i<limit;i++) {
        keys[i] = Math.floor(Math.random() * count) + 1;
      }
    }
    else if (limit===1) {
      keys[0] = Math.floor(Math.random() * count) + 1;
    }
    return Vimeo_videos.find({key: {$in: keys}}, {limit: limit});
  });


}
