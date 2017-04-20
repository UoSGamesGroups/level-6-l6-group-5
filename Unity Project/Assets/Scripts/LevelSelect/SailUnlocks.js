#pragma strict

public var sailName: String;
public var unlocked: boolean;
public var hasBeenSelected: boolean;
public var lockedImage: GameObject;
public var sailColour: Renderer;
public var sailMenu: Renderer;
public var colour: Color;
public var isColour: boolean;
public var material: Material;
public var text: Text;
public var sailImage: Sprite;
public var image: Image;
public var unlockNum: int;
public var prompt: GameObject;
public var defaultItem: boolean;
public var selectPrompt: GameObject;
public var newCosPrompt: NewCosmetic;

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

function HasBeenSelected()
{
	 if(PlayerPrefs.GetInt(sailName + "beenSelected") == 1)
		hasBeenSelected = true;
	else
		hasBeenSelected = false;

	if(!hasBeenSelected && unlocked)
	{
		selectPrompt.SetActive(true);
		newCosPrompt.GetComponent(NewCosmetic).newCosmetic = true;
	}
	else 		
		selectPrompt.SetActive(false);
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
	 			sailMenu.material = material;
		 	}
		 }
	}

	HasBeenSelected();
}

function Clicked()
{
 	if(unlocked)
	 {
	 	hasBeenSelected = true;

	 	PlayerPrefs.SetInt(sailName + "beenSelected", 1);
	 	PlayerPrefs.SetString("SelectedSail", sailName);
	 	
	 	HasBeenSelected();

	 	if(isColour)
	 	{
		 	sailColour.material.color = colour;
	 	}
	 	else
	 	{
	 		sailColour.material = material;
	 		sailMenu.material = material;
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