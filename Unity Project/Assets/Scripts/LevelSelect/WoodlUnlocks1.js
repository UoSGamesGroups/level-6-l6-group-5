#pragma strict

public var woodName: String;
public var unlocked: boolean;
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