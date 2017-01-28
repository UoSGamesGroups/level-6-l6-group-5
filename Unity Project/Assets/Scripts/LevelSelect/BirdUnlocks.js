﻿#pragma strict

public var birdName: String;
public var unlocked: boolean;
public var lockedImage: GameObject;
public var birdColour: Renderer;
public var colour: Color;
public var isColour: boolean;
public var material: Material;

function Start()
{
	Check();
}

function Check()
{
	if(PlayerPrefs.GetInt(birdName + "Bird") == 0 && birdName != "Plain") 
	{
		unlocked = false;
	}
	else
	{
		unlocked = true;
	}

	if(PlayerPrefs.GetInt("SelectedBird") == 0)
	{
		birdColour.material = material;
	}

	lockedImage.SetActive (!unlocked);

	if(PlayerPrefs.GetString("SelectedBird") == birdName) 
	{
		if(unlocked)
		 {
		 	PlayerPrefs.SetString("SelectedBird", birdName);

		 	if(isColour)
		 	{
			 	birdColour.material.color = colour;
		 	}
		 	else
		 	{
		 		birdColour.material = material;
		 	}
		 }
	}
}

function Clicked()
{
 	if(unlocked)
	 {
	 	PlayerPrefs.SetString("SelectedBird", birdName);

	 	if(isColour)
	 	{
		 	birdColour.material.color = colour;
	 	}
	 	else
	 	{
	 		birdColour.material = material;
	 	}
	 }
}