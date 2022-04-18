import { ScrollView, TextInput, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colours";
import TopBar from "../components/topbar";
import Icon from "../components/icon";
import { Post, Comment } from "../api/schemas";
import { CommunityScreenProps } from "../types";
import PostGroup from "../components/PostGroup";

let sampleComment: Comment = {
  id: "1",
  text: "Yea I've had that same problem, basically you have to call them and get them to send another one.",
  likes: 3,
  author: {
    id: "5",
    name: "Jacob Brenna",
  },
};
let sampleComment2: Comment = {
  id: "2",
  text: "Really? I called them and they didn't respond yet did you call the number on the back.",
  likes: 6,
  author: {
    id: "5",
    name: "Tetty Garnet",
  },
};
let sampleComment3: Comment = {
  id: "3",
  text: " Yea you need to call them and then just hit the 0 key on the menu and it routes you to the right person.",
  likes: 5,
  author: {
    id: "5",
    name: "Jacob Brenna",
  },
};
let sampleComment4: Comment = {
  id: "4",
  text: " Oh! I didn't know that, thanks for the tip :) got them to send a new one.",
  likes: 4,
  author: {
    id: "5",
    name: "Tetty Garnet",
  },
};

let sampleComment5: Comment = {
  id: "5",
  text: "No problem! If you have any questions about installing it just make another post!",
  likes: 1,
  author: {
    id: "5",
    name: "Jacob Brenna",
  },
};

let samplePost: Post = {
  id: "1",
  question:
    "Afridev Plunger groove looks weird, is it normal to not be symmetric?",
  answer:
    "The groove for the \"U\" seal sound be symmetric. This will contribute to leaking and \"U\" seal problems. There's no way to fix this, since it is a manufacturing defect. I suggest contacting manufacturers and get a new one.",
  comments: [sampleComment, sampleComment2, sampleComment3, sampleComment4, sampleComment5],
};
let samplePost2: Post = {
  id: "2",
  question:
    "Foot valve is stuck on top of cylinder. How to fix?",
  answer:
    "So what is probably happening is that the valve is oscillating in the rising main as it goes down which gets lodged on the brass cylinder. If you want to fix it, you should calculate the length of the top rod to double check the setting depth, there's no need to call a manufacturur since this is just an installation fault.",
  comments: [
    {
      id: "5",
      text: "Yup this is a really common issue, some extra info FYI is that there is 508 mm of brass cylinder liner above the top of the foot valve, the stroke is only 225mm for an ardive pump",
      likes: 1,
      author: {
        id: "5",
        name: "Kate Lee",
      },
    }, 
    {
      id: "5",
      text: "OO thanks for mentioning that yea this pumps an afridev pump",
      likes: 1,
      author: {
        id: "5",
        name: "John Doe",
      },
    },
    {
      id: "5",
      text: "Your welcome :D Goodluck fixing it",
      likes: 2,
      author: {
        id: "5",
        name: "Kate Lee",
      },
    }
  ],
};
let samplePost3: Post = {
  id: "2",
  question:
    "Need some extra help with potentially installing an India Mark II",
  answer:
    "This question is a little unclear, what is the issue with the pump, is there one that exists already? If you have time go into greater detail in the comments section :)",
  comments: [{
    id: "5",
    text: "Yea theres a pump that's completely busted, was thinking of replacing it with an IMK II.",
    likes: 1,
    author: {
      id: "5",
      name: "Coby Velda",
    },
  }, {
    id: "5",
    text: "I dont recommend installing an IMK II they are really difficult to repair if it becomes busted, and the pipes rust really quickly in 2 years.",
    likes: 2,
    author: {
      id: "5",
      name: "Ryland Dana",
    },
  }, {
    id: "5",
    text: "Oh wow, what should I install instead? The thing is I live in Uganda and they enforce standarization on pumps other than IMK2.",
    likes: 6,
    author: {
      id: "5",
      name: "Coby Velda",
    },
  }, {
    id: "5",
    text: "Check out an Afridev pump instead, they're easier haha I think it's worth the extra cost!",
    likes: 4,
    author: {
      id: "5",
      name: "Ryland Dana",
    },
  }, {
    id: "5",
    text: "Will do thank you!!",
    likes: 3,
    author: {
      id: "5",
      name: "Coby Velda",
    },
  }],
};
let samplePost4: Post = {
  id: "2",
  question:
    "Anyone have any extra \"U\" seal around Mkwezeka Village? ",
  answer:
    "Discussion will be in the comments",
  comments: [{
    id: "5",
    text: "Got one, just shoot me a message here and I can see if its feasible to send one your way.",
    likes: 2,
    author: {
      id: "5",
      name: "Coby Velda",
    },
  }, {
    id: "5",
    text: "sounds good, just sent a message thank you!!!",
    likes: 1,
    author: {
      id: "5",
      name: "Ryland Dana",
    },
  }
  ],
};
let samplePost5: Post = {
  id: "2",
  question:
    "Looking for an Afridev Cylinder that isn't bent",
  answer:
    "Discussion will be in the comments",
  comments: [{
    id: "5",
    text: "Bump, still looking haha",
    likes: 1,
    author: {
      id: "5",
      name: "Laurencia Daniella",
    },
  }, {
    id: "5",
    text: "I have one, are you located near Sauuti Village?",
    likes: 2,
    author: {
      id: "5",
      name: "Rusty Thea",
    },
  },
  {
    id: "5",
    text: "Nope. ",
    likes: 1,
    author: {
      id: "5",
      name: "Laurencia Daniella",
    },
  },
  {
    id: "5",
    text: "Bummer, thats alright, maybe try to call the manufactururer? ",
    likes: 1,
    author: {
      id: "5",
      name: "Kianna Xavia",
    },
  },
  {
    id: "5",
    text: "Got it thanks I'll do that",
    likes: 3,
    author: {
      id: "5",
      name: "Laurencia Daniella",
    },
  }
  ],
};
let samplePost6: Post = {
  id: "2",
  question:
    "Need a foot valve bobbin, one I got was sent broken",
  answer:
    "Discussion will be in the comments",
  comments: [{
    id: "5",
    text: "Have one, where are you located?",
    likes: 5,
    author: {
      id: "5",
      name: "Linzi Nat",
    },
  }, {
    id: "5",
    text: "Golomba Village",
    likes: 1,
    author: {
      id: "5",
      name: "Marni Bowen",
    },
  },
  {
    id: "5",
    text: "Wow I'm really close to there, contact me, here's my email example@gmail.com",
    likes: 4,
    author: {
      id: "5",
      name: "Linzi Nat",
    },
  },
  {
    id: "5",
    text: "will do thatnks!",
    likes: 3,
    author: {
      id: "5",
      name: "Linzi Nat",
    },
  }
  ],
};
let samplePost7: Post = {
  id: "2",
  question:
    "Why do \"U\" Seals keep breaking? What can we do to minimize this?",
  answer:
    "Discussion will be in the comments",
  comments: [{
    id: "5",
    text: "Yea for me I've always noticed it being a really annoying issue, they break like every month for me",
    likes: 1,
    author: {
      id: "5",
      name: "Wilt Sharona",
    },
  }, {
    id: "5",
    text: "It's cause of the varying quality of the material, and also the location of how it works with like how its formed at the joint of 2 components of the plunger body so it often rolls out of its location and causes a blockage in the cylinder",
    likes: 6,
    author: {
      id: "5",
      name: "Glen Elsie",
    },
  },
  {
    id: "5",
    text: "Yea I also noticed that like silt sometimes settles out of the water column overnight and that fills the inside of the seal and when its full it overflows inwards into the groove and causes the seal to wear out irregularly",
    likes: 1,
    author: {
      id: "5",
      name: "Tyrone Jonathon",
    },
  },
  {
    id: "5",
    text: "Honestly I dont think theres a way we can minimzie this, if you look at some cooler pumps like the IMK III they just made it better haha!",
    likes: 3,
    author: {
      id: "5",
      name: "Katherina Briony",
    },
  }
  ],
};
let samplePost8: Post = {
  id: "2",
  question:
    "Afridev design flaws-what do you think should be changed?",
  answer:
    "Discussion will be in the comments",
  comments: [{
    id: "5",
    text: "U SEALS",
    likes: 1,
    author: {
      id: "5",
      name: "Sophia Connie",
    },
  }, {
    id: "5",
    text: "yea i agree u seals are the most annoying. litearlly no other part breaks as much as it, I did some research and like they just break all the time",
    likes: 1,
    author: {
      id: "5",
      name: "Crispin Claudia",
    },
  },
  {
    id: "5",
    text: "yea honestly I want ours to switch to an IMK III but they said they need funding",
    likes: 2,
    author: {
      id: "5",
      name: "Samuel Jerome",
    },
  },
  ],
};
let samplePost9: Post = {
  id: "2",
  question:
    "Common installation faults? What did you find was the most common problem for your local hand pump?",
  answer:
    "Discussion will be in the comments",
  comments: [{
    id: "5",
    text: "U SEALS",
    likes: 2,
    author: {
      id: "5",
      name: "Asia Bryanna",
    },
  }, {
    id: "5",
    text: "Check out this link: https://aquadoc.typepad.com/files/hankin.pdf I found it super helpful",
    likes: 6,
    author: {
      id: "5",
      name: "Ida Anissa",
    },
  },
  {
    id: "5",
    text: "Oh wow thank you that has like everything on there",
    likes: 1,
    author: {
      id: "5",
      name: "Asia Bryanna",
    },
  },
  ],
};


export default function CommunityScreen({ route, navigation }: CommunityScreenProps) {
  const [postText, onChangePostText] = useState("");
  return (
    <View style={styles.topContainer}>
      <TopBar title="Community"></TopBar>
      <View style={styles.mainContainer}>
        <View style={styles.add_post_container}>
          <Icon name="Mary Doe" />
          <TextInput
            style={styles.post_input}
            onChangeText={onChangePostText}
            value={postText}
            placeholder="Make a post..."
          />
        </View>
        <ScrollView
          style={styles.posts_container}
          bounces={true}
          contentContainerStyle={{ paddingBottom: 150 }}
          showsVerticalScrollIndicator={false}
        >
          <PostGroup
            title="Repair"
            posts={[samplePost, samplePost2, samplePost3]}
            navigation={navigation}
            trail={[]}
            screenTitle="Community"
          />
          <PostGroup
            title="Part Sharing"
            posts={[samplePost4, samplePost5, samplePost6]}
            navigation={navigation}
            trail={[]}
            screenTitle="Community"
          />
          <PostGroup
            title="General"
            posts={[samplePost7, samplePost8, samplePost9]}
            navigation={navigation}
            trail={[]}
            screenTitle="Community"
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  mainContainer: {
    margin: 15,
  },
  add_post_container: {
    flexDirection: "row",
    marginBottom: 20,
  },
  post_input: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginLeft: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: "85%",
  },
  posts_container: {
    marginTop: 15,
  },
});
