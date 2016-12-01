#pragma strict

public var unlocked: boolean;
public var selected: boolean;
public var lockedImage: GameObject;
public var sails: GameObject[];
public var sailColour: Renderer;
public var colour: Color;


function Start()
{
	lockedImage.SetActive (!unlocked);
}

function Clicked()
{

	for(var i = 0; i < sails.Length; i++)
	{
		sails[i].GetComponent.<SailUnlocks>().selected = false;
	}


 	if(unlocked)
	 {
	 	selected = true;
	 	sailColour.material.color = colour;
	 }
	
	 


}