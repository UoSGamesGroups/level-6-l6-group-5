#pragma strict

public var woodName: String;
public var unlocked: boolean;
public var hasBeenSelected: boolean;
public var lockedImage: GameObject;
public var woodColour: Renderer;
public var woodMenu: Renderer;
public var colour: Color;
public var isColour: boolean;
public var material: Material;
public var text: Text;
public var woodImage: Sprite;
public var image: Image;
public var unlockNum: int;
public var prompt: GameObject;
public var defaultItem: boolean;
public var selectPrompt: GameObject;
public var newCosPrompt: NewCosmetic;

function Start()
{
	text.text = woodName;
	Check();

	image.sprite = woodImage;

	if(defaultItem)
	{
		if(PlayerPrefs.GetString("SelectedBird") == String.Empty)
		{
			Clicked();
		}
	}
}

function HasBeenSelected()
{
	 if(PlayerPrefs.GetInt(woodName + "beenSelected") == 1)
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
	if(PlayerPrefs.GetInt(woodName + "Wood") == 0 && woodName != "Normal") 
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
	 			woodMenu.material = material;
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

	 	PlayerPrefs.SetInt(woodName + "beenSelected", 1);
	 	PlayerPrefs.SetString("SelectedWood", woodName);

	 	HasBeenSelected();

	 	if(isColour)
	 	{
		 	woodColour.material.color = colour;
	 	}
	 	else
	 	{
	 		woodColour.material = material;
	 		woodMenu.material = material;
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