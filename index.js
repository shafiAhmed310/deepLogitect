const express = require('express');


const app = express();

app.get('/getTimeStories',(req,res,next)=>{
try {
let html = `<div class="partial latest-stories" data-module_name="Latest Stories" data-gtm-vis-first-on-screen-11864053_516="8276" data-gtm-vis-total-visible-time-11864053_516="100" data-gtm-vis-has-fired-11864053_516="1">
<h2 class="latest-stories__heading">Latest Stories</h2>
<ul>
  <li class="latest-stories__item">
    <a href="/6143488/bomb-cyclone-blizzard-new-york/">
      <h3 class="latest-stories__item-headline">A Bomb Cyclone Threatens to Bring Blizzards Along Atlantic Coast. Here's What That Is.</h3>
    </a>
    <time class="latest-stories__item-timestamp">
      January 28, 2022 • 5:49 PM EST
    </time>
  </li>
  <li class="latest-stories__item">
    <a href="/6143463/opioid-overdose-risk-factors/">
      <h3 class="latest-stories__item-headline">The Risk Factors Predicting Opioid Overdoses</h3>
    </a>
    <time class="latest-stories__item-timestamp">
      January 28, 2022 • 5:27 PM EST
    </time>
  </li>
  <li class="latest-stories__item">
    <a href="/6143345/15-week-abortion-ban-supreme-court/">
      <h3 class="latest-stories__item-headline">States Push New Abortion Bans, Preempting the Supreme Court</h3>
    </a>
    <time class="latest-stories__item-timestamp">
      January 28, 2022 • 3:32 PM EST
    </time>
  </li>
  <li class="latest-stories__item">
    <a href="/6143434/biden-infrastructure-bridge-collapse/">
      <h3 class="latest-stories__item-headline">Biden Touts Infrastructure Law After Bridge Collapse</h3>
    </a>
    <time class="latest-stories__item-timestamp">
      January 28, 2022 • 2:57 PM EST
    </time>
  </li>
  <li class="latest-stories__item">
    <a href="/6143373/boris-johnson-party-controversy-resignation-calls/">
      <h3 class="latest-stories__item-headline">Why Boris Johnson May Be Forced to Resign</h3>
    </a>
    <time class="latest-stories__item-timestamp">
      January 28, 2022 • 12:54 PM EST
    </time>
  </li>
  <li class="latest-stories__item">
    <a href="/6138147/augmented-reality-shopping/">
      <h3 class="latest-stories__item-headline">How Augmented Reality Shopping Could Go Mainstream</h3>
    </a>
    <time class="latest-stories__item-timestamp">
      January 28, 2022 • 11:23 AM EST
    </time>
  </li>
</ul>
</div>`
    let htmlArray = html.split('>');
let filteredArray=[]
for (let i = 0; i < htmlArray.length; i++) {
    const element = htmlArray[i].replace(/<[^>]/g, '');
   if(element.includes('h3')||element.includes('href')){
  filteredArray.push(element)
   }
}
filteredArray.forEach((ele,i)=>{
    if(ele.includes('href')){
        ele.replace(/'\n'/g,'');
   let link = ele.substring(12,ele.length-2);
   filteredArray.splice(i,1,`https://time.com${link}`)
    }else{
        let title = ele.substring(0,ele.length-2);
        filteredArray.splice(i,1,title)
    }
});
let finalArray=[]
for (let i = 0; i < filteredArray.length/2; i++) {
   
    let obj={
        tilte:filteredArray[i],
        link:filteredArray[i+1]
    }
    finalArray.push(obj)
}
if(finalArray.length>0){
    res.status(200).json({error:false,message:"Text extracted successfully",response:finalArray});
}else{
    res.status(500).json({error:true,message:"Something went wrong"})
}
  
} catch (error) {
    next(error.message)
}
})

app.use((err, req, res, next) => {
    res.status(500).json({
        error: true,
        details: err
    })
});
app.listen(3000,()=>{
    console.log('Server is running on 3000');
})