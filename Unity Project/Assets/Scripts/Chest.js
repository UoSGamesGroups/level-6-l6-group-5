#pragma strict
import System.Collections.Generic;

public var chestLevel: int;
public var parent: GameObject;
public var chest: GameObject;
public var button: GameObject;
public var chestCreated: GameObject;
public var object: GameObject;
public var legendaryCollectables: List.<String>;
public var rareCollectables: List.<String>;
public var uncommonCollectables: List.<String>;
public var commonCollectables: List.<String>;
public var legendaryCollectablesMaterials: List.<Material>;
public var rareCollectablesMaterials: List.<Material>;
public var uncommonCollectablesMaterials: List.<Material>;
public var commonCollectablesMaterials: List.<Material>;
public var lengendaryChance: int;
public var rareChance: int;
public var uncommonChance: int;
public var commonChance: int;
public var randomRank: int;
public var randomItem: int;
public var totalChests: int;
public var selectedItem: String;
public var selectedItemMaterial: Material;
public var text: Text;
public var sailMesh: Mesh;
public var randomlyChangeItem: int;


function ButtonStart () 
{
	for(var i: int; i < parent.GetComponent(Chests).chests.Length; i++)
	{
		if(!parent.GetComponent(Chests).chests[i].zoneSpecific)
		{
			AddToList(parent.GetComponent(Chests).chests[i].name, parent.GetComponent(Chests).chests[i].rarity.ToString(), parent.GetComponent(Chests).chests[i].texture);
		}
		else if(parent.GetComponent(Chests).chests[i].zoneSpawn == chestLevel && parent.GetComponent(Chests).chests[i].zoneSpecific)
		{
			AddToList(parent.GetComponent(Chests).chests[i].name, parent.GetComponent(Chests).chests[i].rarity.ToString(), parent.GetComponent(Chests).chests[i].texture);
		}
	}
}

function ChestStart () 
{
	for(var i: int; i < button.GetComponent(Chest).legendaryCollectables.Count; i++)
	{
		legendaryCollectables.Add(button.GetComponent(Chest).legendaryCollectables[i]);
		legendaryCollectablesMaterials.Add(button.GetComponent(Chest).legendaryCollectablesMaterials[i]);
	}

	for(var j: int; j < button.GetComponent(Chest).rareCollectables.Count; j++)
	{
		rareCollectables.Add(button.GetComponent(Chest).rareCollectables[j]);
		rareCollectablesMaterials.Add(button.GetComponent(Chest).rareCollectablesMaterials[j]);
	}

	for(var k: int; k < button.GetComponent(Chest).uncommonCollectables.Count; k++)
	{
		uncommonCollectables.Add(button.GetComponent(Chest).uncommonCollectables[k]);
		uncommonCollectablesMaterials.Add(button.GetComponent(Chest).uncommonCollectablesMaterials[k]);
	}

	for(var l: int; l < button.GetComponent(Chest).commonCollectables.Count; l++)
	{
		commonCollectables.Add(button.GetComponent(Chest).commonCollectables[l]);
		commonCollectablesMaterials.Add(button.GetComponent(Chest).commonCollectablesMaterials[l]);
	}
	GetItem();
}

function Update()
{
	if(parent == null)
	{

	}
	else 
	{
			text.text = "Level " + chestLevel.ToString();
	}
}

function AddToList(collectionName: String, rarity: String, mat: Material) 
{
	switch(rarity)
	{
		case "Legendary": legendaryCollectables.Add(collectionName);
						  legendaryCollectablesMaterials.Add(mat);
						  break;
		case "Rare": rareCollectables.Add(collectionName);
					 rareCollectablesMaterials.Add(mat);
					 break;
		case "Uncommon": uncommonCollectables.Add(collectionName);
					     uncommonCollectablesMaterials.Add(mat);
						 break;
		case "Common": commonCollectables.Add(collectionName);
					   commonCollectablesMaterials.Add(mat);
					   break;
	}
}

function Clicked()
{
	chestCreated = Instantiate(chest, new Vector3(0.67,10.64,-0.04), Quaternion.Euler(32.596, -74.22701, -62.331));
	chestCreated.GetComponent(Chest).button = this.gameObject;
	chestCreated.GetComponent(Chest).chestLevel = chestLevel;
	chestCreated.GetComponent(Chest).ChestStart();
}

function GetItem()
{
	randomRank = Random.Range(0,100);

	if(randomRank <= commonChance)
	{
		randomItem = Random.Range(0, commonCollectables.Count);
		selectedItem = commonCollectables.Item[randomItem];
		selectedItemMaterial = commonCollectablesMaterials.Item[randomItem];
		Debug.Log("1");
	}
	else if(randomRank > commonChance && randomRank <= uncommonChance + commonChance)
	{
		randomItem = Random.Range(0, uncommonCollectables.Count);
		selectedItem = uncommonCollectables.Item[randomItem];
		selectedItemMaterial = uncommonCollectablesMaterials.Item[randomItem];
		Debug.Log("2");
	}
	else if(randomRank > uncommonChance + commonChance && randomRank <= rareChance + uncommonChance + commonChance)
	{
		randomItem = Random.Range(0, rareCollectables.Count);
		selectedItem = rareCollectables.Item[randomItem];
		selectedItemMaterial = rareCollectablesMaterials.Item[randomItem];
		Debug.Log("3");
	}
	else if(randomRank > rareChance + uncommonChance + commonChance && randomRank <= lengendaryChance + rareChance + uncommonChance + commonChance)
	{
		randomItem = Random.Range(0, legendaryCollectables.Count);
		selectedItem = legendaryCollectables.Item[randomItem];
		selectedItemMaterial = legendaryCollectablesMaterials.Item[randomItem];
		Debug.Log("4");
	}


	randomlyChangeItem ++;

	object.GetComponent(Renderer).material = selectedItemMaterial;

	if(randomlyChangeItem < 20)
	{
		Wait();
	}
	else
	{
		Debug.Log(selectedItem);

		Destroy();
	}
}

function Wait()
{
	yield WaitForSeconds(0.2);
	GetItem();
}

function Destroy()
{
	/*
	totalChests = PlayerPrefs.GetInt("Zone"+ chestLevel);
	totalChests --;
	PlayerPrefs.SetInt("Zone"+ chestLevel, totalChests);
	*/
	yield WaitForSeconds(5);
	
	Destroy(button.gameObject);
	Destroy(this.gameObject);

}