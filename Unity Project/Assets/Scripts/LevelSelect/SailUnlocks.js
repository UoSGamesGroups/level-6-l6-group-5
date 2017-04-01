#pragma strict

public var sailName: String;
public var unlocked: boolean;
public var lockedImage: GameObject;
public var sailColour: Renderer;
public var colour: Color;
public var isColour: boolean;
public var material: Material;
public var text: Text;
public var sailImage: Sprite;
public var image: Image;
public var unlockNum: int;
public var prompt: GameObject;
public var defaultItem: boolean;

function Start()
{
	text.text = sailName;
	Check();

	image.sprite = sailImage;

	if(defaultItem)
	{
		if(PlayerPrefs.GetString("SelectedSail") == String.Empty)
		{
			Clicked();
		}
	}
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
	 else
	 {
	 	prompt.GetComponent(Prompt).num = unlockNum;
	 	prompt.SetActive(true);
	 	prompt.GetComponent(Prompt).Clicked();
	 }
}

function OnEnable()
{
	Check();
}