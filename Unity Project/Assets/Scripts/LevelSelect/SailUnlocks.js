#pragma strict

public var sailName: String;
public var unlocked: boolean;
public var lockedImage: GameObject;
public var sailColour: Renderer;
public var colour: Color;
public var isColour: boolean;
public var material: Material;

function Start()
{
	Check();
}

function Check()
{
	if(PlayerPrefs.GetInt(sailName + "Sail") == 0 && sailName != "Plain") 
	{
		unlocked = false;
	}
	else
	{
		unlocked = true;
	}


	lockedImage.SetActive (!unlocked);

	if(PlayerPrefs.GetString("SelectedSail") == sailName) 
	{
		if(unlocked)
		 {
		 	PlayerPrefs.SetString("SelectedSail", sailName);

		 	if(isColour)
		 	{
			 	sailColour.material.color = colour;
		 	}
		 	else
		 	{
		 		sailColour.material = material;
		 	}
		 }
	}
}

function Clicked()
{

 	if(unlocked)
	 {
	 	PlayerPrefs.SetString("SelectedSail", sailName);

	 	if(isColour)
	 	{
		 	sailColour.material.color = colour;
	 	}
	 	else
	 	{
	 		sailColour.material = material;
	 	}
	 }
}