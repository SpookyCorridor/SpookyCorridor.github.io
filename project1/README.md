#[Crumblr](http://spookycorridor.github.io/project1/)

Crumblr uses Reddit's powerful search tools in the form of plain english. 
It allows you to search for a wallpaper or youtube video with filtering options. 

![Crumblr Home](http://i.imgur.com/dNByQdc.png?2 "Crumblr Home")

:notebook_with_decorative_cover: Table of Contents :notebook_with_decorative_cover:
=================

- [links](#links)
- [intro](#intro)
- [Installation](#installation)
- [Queries](#queries)
  * [Wallpaper](#wallpaper)
    * [Advanced options](#advanced)
  * [Videos](#video)
- [Technologies](#technologies) 
- [TODO](#todo) 
- [Known Issues](#known issues)

=====


# Links

[Crumblr](http://spookycorridor.github.io/project1/)

# Intro

Crumblr is a simple way to find wallpapers and videos from Reddit. It focuses on a rich user experience with the idea of natural language to utilize Reddit's advanced search criteria. I created Crumblr because I wanted a quick way to find new wallpapers or inspiration. 

# Installation

 - clone down the repository
 - open the index.html file in your browser 

# Queries 

You can find exactly what you're looking for by building a crumblr query. 

- any subreddit can be searched
- sort includes: 
       -  hot | new | rising | controversial | top | gilded | wiki | promoted
- time includes: 
       + hour | day | week | month | year | all

## Wallpaper 

  ![Wallpaper Query](http://i.imgur.com/qH2o1nh.png?2 "Wallpaper Query") 

__`cats`__ is the tag. 
__`pics`__ is the subreddit
__`rising`__ is the sort
__`week`__ is the time (how far back in time to look)

> you can add multiple tags with a '+' :   __`funny+cats`__ 

### Advanced options ![Advanced button]( http://i.imgur.com/flFAPmm.png?5 "Advanced button")

![Wallpaper Query Advanced](http://i.imgur.com/qSGxxuN.png?1 "Wallpaper Advanced Query")

__`800`__ is the minimum width in pixels the image should be 
__`500`__ is the minimum height in pixels the image should be 

## Video 

![Video Query Example](http://i.imgur.com/2o8aIxV.png?4 "Video Query") 

__`birds`__ is the tag
__`videos`__ is the subreddit
__`top`__ is the sort
__`month`__ is the time (how far back in time to look) 

# Technologies :floppy_disk:

- HTML5
- CSS3
- Skeleton
- font-awesome 
- jQuery
- MediaElement.js 


# TODO :coffee::coffee::coffee:
 - [ ] more advanced query options
 - [X] more efficient queries 
 - [ ] more accepted media formats (currently only imgur and youtube)
 - [ ] multiple color palletes

# Known Issues  :rotating_light:

