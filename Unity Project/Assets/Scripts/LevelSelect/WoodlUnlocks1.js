#pragma strict

public var woodName: String;
public var unlocked: boolean;
public var lockedImage: GameObject;
public var woodColour: Renderer;
public var colour: Color;
public var isColour: boolean;
public var material: Material;
public var text: Text;

function Start()
{
	text.text = woodName;
	Check();
}

function Check()
{
	if(PlayerPrefs.GetInt(woodName + "Wood") == 0 && woodName != "Wood") 
	{
		unlocked = false;
	}
	else
	{
		unlocked = true;
	}


	lockedImage.SetActive (!unlocked);

	if(PlayerPrefs.GetString("SelectedWood") == woodName) 
	{
		if(unlocked)
		 {
		 	PlayerPrefs.SetString("SelectedWood", woodName);

		 	if(isColour)
		 	{
			 	woodColour.material.color = colour;
		 	}
		 	else
		 	{
		 		woodColour.material = material;
		 	}
		 }
	}
}

function Clicked()
{
 	if(unlocked)
	 {
	 	PlayerPrefs.SetString("SelectedWood", woodName);

	 	if(isColour)
	 	{
		 	woodColour.material.color = colour;
	 	}
	 	else
	 	{
	 		woodColour.material = material;
	 	}
	 }
}

function OnEnable()
{
	Check();
}