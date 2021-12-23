# Tongue Drum Hero - An Implementation of the HeARo Framework
By Ethan Ruoff (Team Tongue Drum Hero | er3074)
Submitted December 22nd, 2021

Developed on Lens Studio by Snap Inc. for the Next Generation (2021) Spectacles. If you would like to implement the HeARo framework, please scroll down to the "Implementing The HeARo Framework on your own instrument" section.

A demo of Tongue Drum Hero is viewable at [https://youtu.be/3BcJqnj3xVg](https://youtu.be/3BcJqnj3xVg).

## Directory Overview
This repo is structured like a standard Lens Studio project with all of the resources in the "Public" folder. The root directory contains the following files:
- Abstract.pdf : The two page abstract
- icon.png : The icon for the lens when it is published
- Previews folder : This folder contains all of the custom previews that you want to use in the simulation panel.
- project.data : Stores the data for the project. Do NOT edit.
- Public folder : This folder contains all of the resources used in the project.
    - 3D Carousel Resources : All of the resources used for the song selection and difficulty selection menus
        - Icons : Contains the artwork used for the selection menus
    - 3D_Carousel.oprfb : The Prefab for the selection menus
    - ExtendedMarkerTracking : Contains the script used for extended marker tracking
    - Extended_Marker_Tracking.oprfb : The prefab for extended marker tracking
    - Magnifying Hint : Contains all of the resources used for the screen that pops up before the marker is detected
    - Markers : Contains the image marker and the image the image marker uses
    - Materials : Contains all of the extraneous materials
        - Notes : Contains the materials used for the notes
    - Meshes : Contains the sphere and plane meshes used in the project
    - Scripts : Contains any scripts used in the project
    - Textures : Contains extraneous textures used in the project
    - Tween : Contains everything the tween manager uses

- README.md : This file
- Snapcode.png : The snapcode that you can scan to use this lens.
- Tongue Drum Hero.lsproj : The project file for Tongue Drum Hero. Open this file to edit the project.
- Website Blurb.pdf : A blurb and screenshot for the COMS6998 website
- Written Description.pdf : An extended version of the abstract that includes extensive details on how to implement the HeARo framework
 
## How to Deploy Tongue Drum Hero
You can access Tongue Drum Hero by clicking [here](https://lens.snapchat.com/1a64020ee09343d7ae3aebe547a2e5d0?sender_web_id=f95da986-49ee-4ea2-a393-a23c957f7305&device_type=desktop&is_copy_url=true) or scanning this Snapcode:

![The Snapcode to the Tongue Drum Hero Lens](Snapcode.png)

If you want to fork and modify Tongue Drum Hero, then please follow these directions to view your modified version:
1. launch Lens Studio
2. Select "Open Project" and choose "Tongue Drum Hero.lsproj" in the root directory of this repo.
3. In the upper-right-hand corner of the project, there should be a button to send the project to Snapchat. Click the arrow next to it and select "Send to Spectacles"

## How to Setup the Tongue Drum Hero Tracker
The Tongue Drum Hero demonstration of the HeARo framework is currently only compatible to the "Yinama Steel Tongue Drum Percussion Instrument 11 Notes 10 inches" that can be purchased [here](https://www.amazon.com/gp/product/B07QF5FB12). Please make sure to purchase the 10 inch version and not the 12 inch. 

Once you have the Tongue Drum, the next step is to print the [marker](./Public/Markers/Scaled_Marker_Image.png) onto an 8.5x11in piece of paper in landscape. From there, you can mount the marker to the back of the tongue drum via popsicle sticks and tape or any other apparatus you see fit. Once mounted, then adjust the marker so that the notes line up. Alternatively, once mounted you can adjust the position of notes (Camera/Image Marker/Notes) scene object in the scene.


## Missing Features
There are many ways in which the HeARo framework can be further developed. One such way would be adding sound input to the framework. By taking in sound, HeARo could recognize the notes being played on an instrument. This would allow HeARo to judge how well users are playing and give them ways to measure their improvement over time via a leaderboard system. Another improvement would be implementing 3D instrument models by setting up an instrument mesh in the scene. This would allow HeARo to work with instruments that are played outside of the user’s field of view. One more potential future improvement for HeARo would be adding more gamification elements. For example, adding functionality that makes the green spheres fly towards the right note could make HeARo more fun to use while increasing engagement with users.


## Current Bugs
There are currently only two known bugs in Tongue Drum Hero that are both results of Lens Studio and the Spectacles. The first one is that when you move your head quickly as the marker is first discovered the notes will be significantly off. This is because the extended marker tracking only uses the first frame of the marker tracking while the marker tracking itself requires multiple frames to calibrate itself if the glasses are quickly moving. The second bug is that the extended marker tracking sometimes causes the notes to drift overtime. Both of these bugs can be fixed by simply restarting the lens.

In Lens Studio there is another bug in the preview mode that makes the notes static and not track with the video preview used. This bug persists only in Lens Studio and goes away when the lens is loaded to the Spectacles.

## Asset Sources
I made all of the assets in this project except for the magnifying glass hint icon which way made by Snap Inc.



# Implementing The HeARo Framework on your own instrument
The HeARo framework consists of multiple steps that allow a developer to create a unique marker, note layout, write numerous songs, and create multiple difficulties in their very own Snapchat lens. While HeARo is free to use and implement, we please ask that you credit HeARo and Ethan Ruoff.

## Create a Unique Marker
The first step of implementing the HeARo framework is to create a unique marker for the project. This marker is used as a reference point for tracking the instrument and where the notes should be. Since the Next Generation (2021) Spectacles have a very wide field of view, it is important to make the printed version of the marker as large as possible so that it can be easily recognized. Other best practices are to make the marker high contrast and asymmetrical so that the program can easily recognize it.

Once you have created a marker with a smaller resolution than 2048x2048 pixels, add the image to the “Markers” folder in Resources. From there, click the plus icon to add a new “Image Marker” resource. When it prompts you to select an image, choose the new marker you just added to your resources. Lastly, navigate to “Camera/Image Marker” in your scene and make the Marker Tracking component reference the Image Marker you just created.
While this has caused the notes to use the new marker for tracking, the hint is still referencing the older marker’s image. To fix this, navigate to “Orthographic Camera/Magnifying Hint” and update the Preview Texture in the script component to reference your new image.

## Note Layout
HeARo allows the developer to place as few or as many notes as they want wherever they want on/around an instrument.  Each note is represented by a sphere mesh with a unique green material. When it becomes time for a user to play a note, the corresponding sphere will gradually change from green to red. These notes are mapped to a tracked marker that must be placed near the instrument. Please note that Tongue Drum Hero includes an optional occluder to make it appear that the notes are coming out of the drum.

By default, HeARo is configured to use 11 notes. To add or remove notes, simply duplicate or delete notes in the scene under “Camera/Image Marker/Notes.” I strongly recommend ordering these with the lowest note at the top and the highest note at the bottom to make song writing as intuitive as possible. If you are adding new notes via duplication, for each new note added, duplicate the corresponding material in “Materials/Notes” and assign the new SceneObject’s “Material 1” parameter to the new material. Once you have decided upon the number of notes to use, lay them out using the transform component in the Scene editor. This step may take a lot of trial and error to get correct but is definitely worth the effort since one little mistake here could ruin the experience for users. You can additionally edit the Occluder SceneObject to be the same shape as your instrument to add additional realism to HeARo. If you don’t choose to do this, then disable or delete the Occluder object.

## Song Writing
Once the notes are laid out, developers can start writing songs. Songs are written in the ColorChange script and are composed of an array of arrays, with the first value being an integer that represents the beats per minute. Each inner array is composed of the notes and a length with a length of one equaling a whole note in the 4/4 time signature.  For the note values, zero represents the lowest note with the pitch subsequently increasing alongside the note value.

## Song and Difficulty Selection
The next step is to set up the two menus: the song selection and difficulty selection menus. These menus are modified versions of the 3D UI Carousel asset [2] provided by Snapchat and can be navigated by swiping and tapping on the touch panel on the right side of the Spectacles. The menus are modified to disappear after selection and reappear at the end of each song. As the name implies, the song selection menu is used to select the previously created songs, whereas the difficulty menu is used to choose the difficulty. The developer can modify the difficulty options, but there are only two options by default: real-time and practice. The real-time difficulty plays the song in real-time, while the practice mode doubles the time of each note to allow the user to have more time.

To edit either of these menus, navigate to “UI Camera” and expand the carousel and SceneObject that you hope to edit. Once expanded, add as many objects as you would like to have options. For each different object from the default, create an icon in “3D Carousel Resources/Icons,” create a corresponding material in “3D Carousel Resources/Materials,” and update the “Material 1” parameter for that object with the material you just made. Once you have fully updated the frontend portion of the selection menus, open the ColorChange script and navigate to the “script.api.setIndex” function. In this function, edit the two ternary operators to correspond with the indexes of the icons. For the difficulty variable, the higher the value assigned, the slower the song. For example, a value of one is real-time, two is half as fast, etc. 

