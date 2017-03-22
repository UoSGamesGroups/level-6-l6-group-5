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
public var legendaryCollectablesType: List.<String>;
public var rareCollectablesType: List.<String>;
public var uncommonCollectablesType: List.<String>;
public var commonCollectablesType: List.<String>;
public var legendaryCollectablesMesh: List.<Mesh>;
public var rareCollectablesMesh: List.<Mesh>;
public var uncommonCollectablesMesh: List.<Mesh>;
public var commonCollectablesMesh: List.<Mesh>;
public var lengendaryChance: int;
public var rareChance: int;
public var uncommonChance: int;
public var commonChance: int;
public var randomRank: int;
public var randomItem: int;
public var totalChests: int;
public var selectedItem: String;
public var selectedItemMaterial: Material;
public var selectedItemType: String;
public var selectedItemMesh: Mesh;
public var text: Text;
public var sailMesh: Mesh;
public var randomlyChangeItem: int;
public var clicked: boolean;
public var mesh: MeshFilter;
public var objectMat: Renderer;
public var parentButtonObject: GameObject;
public var opened: boolean;

function Start ()
{
	Debug.Log("Start");
}

function ButtonStart () 
{
	for(var i: int; i < parent.GetComponent(Chests).chests.Length; i++)
	{
		if(!parent.GetComponent(Chests).chests[i].zoneSpecific)
		{
			AddToList(parent.GetComponent(Chests).chests[i].name, parent.GetComponent(Chests).chests[i].rarity.ToString(), parent.GetComponent(Chests).chests[i].texture, parent.GetComponent(Chests).chests[i].type.ToString(), parent.GetComponent(Chests).chests[i].mesh);
			Debug.Log(parent.GetComponent(Chests).chests[i].type.ToString());
		}
		else if(parent.GetComponent(Chests).chests[i].zoneSpawn == chestLevel && parent.GetComponent(Chests).chests[i].zoneSpecific)
		{
			AddToList(parent.GetComponent(Chests).chests[i].name, parent.GetComponent(Chests).chests[i].rarity.ToString(), parent.GetComponent(Chests).chests[i].texture, parent.GetComponent(Chests).chests[i].type.ToString(), parent.GetComponent(Chests).chests[i].mesh);
		}
	}
}

function ChestStart () 
{
	for(var i: int; i < button.GetComponent(Chest).legendaryCollectables.Count; i++)
	{
		legendaryCollectables.Add(button.GetComponent(Chest).legendaryCollectables[i]);
		legendaryCollectablesMaterials.Add(button.GetComponent(Chest).legendaryCollectablesMaterials[i]);
		legendaryCollectablesType.Add(button.GetComponent(Chest).legendaryCollectablesType[i]);
		legendaryCollectablesMesh.Add(button.GetComponent(Chest).legendaryCollectablesMesh[i]);
	}

	for(var j: int; j < button.GetComponent(Chest).rareCollectables.Count; j++)
	{
		rareCollectables.Add(button.GetComponent(Chest).rareCollectables[j]);
		rareCollectablesMaterials.Add(button.GetComponent(Chest).rareCollectablesMaterials[j]);
		rareCollectablesType.Add(button.GetComponent(Chest).rareCollectablesType[j]);
		rareCollectablesMesh.Add(button.GetComponent(Chest).rareCollectablesMesh[j]);
	}

	for(var k: int; k < button.GetComponent(Chest).uncommonCollectables.Count; k++)
	{
		uncommonCollectables.Add(button.GetComponent(Chest).uncommonCollectables[k]);
		uncommonCollectablesMaterials.Add(button.GetComponent(Chest).uncommonCollectablesMaterials[k]);
		uncommonCollectablesType.Add(button.GetComponent(Chest).uncommonCollectablesType[k]);
		uncommonCollectablesMesh.Add(button.GetComponent(Chest).uncommonCollectablesMesh[k]);
	}

	for(var l: int; l < button.GetComponent(Chest).commonCollectables.Count; l++)
	{
		commonCollectables.Add(button.GetComponent(Chest).commonCollectables[l]);
		commonCollectablesMaterials.Add(button.GetComponent(Chest).commonCollectablesMaterials[l]);
		commonCollectablesType.Add(button.GetComponent(Chest).commonCollectablesType[l]);
		commonCollectablesMesh.Add(button.GetComponent(Chest).commonCollectablesMesh[l]);
	}

	GetItem();

	ChestOpen(true);

	objectMat = object.GetComponent(Renderer);
}

function ChestOpen(opening: boolean)
{
	var parentObj: GameObject;
	parentObj = parentButtonObject.GetComponent(Chest).parent;
	parentObj.GetComponent(Chests).chestOpening = opening;
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

	if(opened && Input.GetMouseButtonDown(0))
	{
			ChestOpen(false);

			Destroy(button.gameObject);
			Destroy(this.gameObject);
	}

}

function AddToList(collectionName: String, rarity: String, mat: Material, type: String, mesh: Mesh) 
{
	switch(rarity)
	{
		case "Legendary": legendaryCollectables.Add(collectionName);
						  legendaryCollectablesMaterials.Add(mat);
						  legendaryCollectablesType.Add(type);
						  legendaryCollectablesMesh.Add(mesh);
						  break;
		case "Rare": rareCollectables.Add(collectionName);
					 rareCollectablesMaterials.Add(mat);
					 rareCollectablesType.Add(type);
					 rareCollectablesMesh.Add(mesh);
					 break;
		case "Uncommon": uncommonCollectables.Add(collectionName);
					     uncommonCollectablesMaterials.Add(mat);
						 uncommonCollectablesType.Add(type);
						 uncommonCollectablesMesh.Add(mesh);
						 break;
		case "Common": commonCollectables.Add(collectionName);
					   commonCollectablesMaterials.Add(mat);
					   commonCollectablesType.Add(type);
					   commonCollectablesMesh.Add(mesh);
					   break;
	}
}

function Clicked()
{
	if(!clicked && !parent.GetComponent(Chests).chestOpening)
	{
		chestCreated = Instantiate(chest, new Vector3(0.123,12.482,-0.25), Quaternion.Euler(32.596, -74.22701, -62.331));
		//chestCreated = Instantiate(chest, new Vector3(0.67,10.64,-0.04), Quaternion.Euler(32.596, -74.22701, -62.331));
		chestCreated.GetComponent(Chest).button = this.gameObject;
		chestCreated.GetComponent(Chest).chestLevel = chestLevel;
		chestCreated.GetComponent(Chest).parentButtonObject = this.gameObject;
		chestCreated.GetComponent(Chest).ChestStart();
		clicked = true;
	}
}

function GetItem()
{
	randomRank = Random.Range(0,100);

	if(randomRank <= commonChance)
	{
		randomItem = Random.Range(0, commonCollectables.Count);
		selectedItem = commonCollectables.Item[randomItem];
		selectedItemMaterial = commonCollectablesMaterials.Item[randomItem];
		selectedItemType = commonCollectablesType.Item[randomItem];
		selectedItemMesh = commonCollectablesMesh.Item[randomItem];
		Debug.Log("1");
	}
	else if(randomRank > commonChance && randomRank <= uncommonChance + commonChance)
	{
		randomItem = Random.Range(0, uncommonCollectables.Count);
		selectedItem = uncommonCollectables.Item[randomItem];
		selectedItemMaterial = uncommonCollectablesMaterials.Item[randomItem];
		selectedItemType = uncommonCollectablesType.Item[randomItem];
		selectedItemMesh = uncommonCollectablesMesh.Item[randomItem];
		Debug.Log("2");
	}
	else if(randomRank > uncommonChance + commonChance && randomRank <= rareChance + uncommonChance + commonChance)
	{
		randomItem = Random.Range(0, rareCollectables.Count);
		selectedItem = rareCollectables.Item[randomItem];
		selectedItemMaterial = rareCollectablesMaterials.Item[randomItem];
		selectedItemType = rareCollectablesType.Item[randomItem];
		selectedItemMesh = rareCollectablesMesh.Item[randomItem];
		Debug.Log("3");
	}
	else if(randomRank > rareChance + uncommonChance + commonChance && randomRank <= lengendaryChance + rareChance + uncommonChance + commonChance)
	{
		randomItem = Random.Range(0, legendaryCollectables.Count);
		selectedItem = legendaryCollectables.Item[randomItem];
		selectedItemMaterial = legendaryCollectablesMaterials.Item[randomItem];
		selectedItemType = legendaryCollectablesType.Item[randomItem];
		selectedItemMesh = legendaryCollectablesMesh.Item[randomItem];
		Debug.Log("4");
	}

	mesh.mesh = selectedItemMesh;
	randomlyChangeItem ++;

	//objectMat.material = selectedItemMaterial;

	mesh.GetComponent(Renderer).material = selectedItemMaterial;

	if(selectedItemType == "Sail") 
	{
		object.transform.localRotation = Quaternion.Euler(-90, 180, 2.25);
		//object.transform.localScale = new Vector3(0.3616386,0.3616386,0.3616386);
	}
	else
	{
		object.transform.localRotation = Quaternion.Euler(-179.555, 177.254, 85.771);
		object.transform.localScale = new Vector3(0.005475328,0.005475328,0.005475328);
	}
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
	totalChests = PlayerPrefs.GetInt("Zone"+ chestLevel);
	totalChests --;
	PlayerPrefs.SetInt("Zone"+ chestLevel, totalChests);

	PlayerPrefs.SetInt(selectedItem + selectedItemType , 1);

	Analytic("Chest", true, "Chest Open");

	//yield WaitForSeconds(5);

	opened = true;
	/*
	ChestOpen(false);

	Destroy(button.gameObject);
	Destroy(this.gameObject);
	*/
}

function Analytic(name: String, num: Object, eventName: String)
{
	//Test for analytics. Might change. 
	var params = new System.Collections.Generic.Dictionary.<System.String,System.Object>();
	params.Add(eventName, num);
	var returnVal = Analytics.Analytics.CustomEvent(name, params);
	Debug.Log(returnVal);
}