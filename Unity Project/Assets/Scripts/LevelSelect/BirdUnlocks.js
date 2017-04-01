#pragma strict

public var birdName: String;
public var unlocked: boolean;
public var lockedImage: GameObject;
public var birdColour: Renderer;
public var colour: Color;
public var isColour: boolean;
public var material: Material;
public var text: Text;
public var birdImage: Sprite;
public var image: Image;
public var unlockNum: int;
public var prompt: GameObject;
public var defaultItem: boolean;

function Start()
{
	text.text = birdName;
	Check();

	image.sprite = birdImage;

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
	if(PlayerPrefs.GetInt(birdName + "Pet") == 0 && birdName != "Green") 
	{
		unlocked = false;
	}
	else
	{
		unlocked = true;
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