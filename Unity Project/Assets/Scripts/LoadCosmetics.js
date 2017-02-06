#pragma strict

public class cosmetics
{
	public var name: String;
	public var cosmeticsType: cosmeticsTypes;
	public var material: Material;
	
}

enum cosmeticsTypes {Sail, Wood, Pet};

public var isBoss: boolean;
public var wood: String;
public var sail: String;
public var bird: String;
public var woodRenderer: Renderer;
public var sailRenderer: Renderer;
public var birdRenderer: Renderer;
public var cosmetic: cosmetics[]; 

function Start () 
{
	sail = PlayerPrefs.GetString("SelectedSail");
	wood = PlayerPrefs.GetString("SelectedWood");
	bird = PlayerPrefs.GetString("SelectedBird");

	if(isBoss)
	{
		GetWood();
		GetSail();
		GetBird();
	}
	else
	{
		GetWood();
	}
}

function GetSail()
{
	for(var i: int = 0; i < cosmetic.Length; i++)
	{
		if(sail == cosmetic[i].name && cosmetic[i].cosmeticsType ==  cosmeticsTypes.Sail)
		{
			sailRenderer.material = cosmetic[i].material;
		}
	}
}

function GetWood()
{
	for(var i: int = 0; i < cosmetic.Length; i++)
	{
		if(wood == cosmetic[i].name && cosmetic[i].cosmeticsType ==  cosmeticsTypes.Wood)
		{
			woodRenderer.material = cosmetic[i].material;
		}
	}
}

function GetBird()
{
	for(var i: int = 0; i < cosmetic.Length; i++)
	{
		if(bird == cosmetic[i].name && cosmetic[i].cosmeticsType ==  cosmeticsTypes.Pet)
		{
			birdRenderer.material = cosmetic[i].material;
		}
	}
}
