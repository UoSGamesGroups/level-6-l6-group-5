#pragma strict
import System.Collections.Generic;

public var chestLevel: int;
public var parent: GameObject;
public var legendaryCollectables: List.<String>;
public var rareCollectables: List.<String>;
public var uncommonCollectables: List.<String>;
public var commonCollectables: List.<String>;
public var lengendaryChance: int;
public var rareChance: int;
public var uncommonChance: int;
public var commonChance: int;
public var randomRank: int;
public var randomItem: int;
public var totalChests: int;
public var selectedItem: String;
public var text: Text;

function Start () 
{
	for(var i: int; i < parent.GetComponent(Chests).chests.Length; i++)
	{
		if(!parent.GetComponent(Chests).chests[i].zoneSpecific)
		{
			AddToList(parent.GetComponent(Chests).chests[i].name, parent.GetComponent(Chests).chests[i].rarity.ToString());
		}
		else if(parent.GetComponent(Chests).chests[i].zoneSpawn == chestLevel && parent.GetComponent(Chests).chests[i].zoneSpecific)
		{
			AddToList(parent.GetComponent(Chests).chests[i].name, parent.GetComponent(Chests).chests[i].rarity.ToString());
		}
	}
}

function Update()
{
	text.text = "Level " + chestLevel.ToString();
}

function AddToList(collectionName: String, rarity: String) 
{
	switch(rarity)
	{
		case "Legendary": legendaryCollectables.Add(collectionName);
							break;
		case "Rare": rareCollectables.Add(collectionName);
							break;
		case "Uncommon": uncommonCollectables.Add(collectionName);
							break;
		case "Common": commonCollectables.Add(collectionName);
							break;
	}
}

function Clicked()
{
	randomRank = Random.Range(0,100);

	if(randomRank <= commonChance)
	{
		randomItem = Random.Range(0, commonCollectables.Count);
		selectedItem = commonCollectables.Item[randomItem];
	}
	else if(randomRank > commonChance && randomRank <= uncommonChance + commonChance)
	{
		randomItem = Random.Range(0, uncommonCollectables.Count);
		selectedItem = uncommonCollectables.Item[randomItem];
	}
	else if(randomRank > uncommonChance + commonChance && randomRank <= rareChance + uncommonChance + commonChance)
	{
		randomItem = Random.Range(0, rareCollectables.Count);
		selectedItem = rareCollectables.Item[randomItem];
	}
	else if(randomRank > rareChance + uncommonChance + commonChance && randomRank <= lengendaryChance + rareChance + uncommonChance + commonChance)
	{
		randomItem = Random.Range(0, legendaryCollectables.Count);
		selectedItem = legendaryCollectables.Item[randomItem];
	}

	/*
	totalChests = PlayerPrefs.GetInt("Zone"+ chestLevel);
	totalChests --;
	PlayerPrefs.SetInt("Zone"+ chestLevel, totalChests);

	Destroy(this.gameObject);
	*/

	Debug.Log("Delete now");
}