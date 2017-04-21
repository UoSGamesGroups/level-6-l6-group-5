#pragma strict
public var powerUp1Count: int;
public var powerUp2Count: int;
public var powerUp3Count: int;
public var powerUp4Count: int;
public var pickupEffect: GameObject;
public var textPrefab: GameObject;
public var powerName: String;

function OnCollisionEnter(other:Collision)
{
	if(other.gameObject.tag == "PowerUp")
	{
		var powerCollected: int = other.gameObject.GetComponent.<PowerUpPickUpObj>().powerId;
		var effectPos: Vector3;
		effectPos = transform.position;
		var effect = Instantiate(pickupEffect, effectPos, Quaternion.Euler(Vector3(90,0,0)));


		effect.transform.parent = gameObject.transform;

		switch(powerCollected)
		{
			case 1: powerUp1Count ++;
					PlayerPrefs.SetInt("PowerUp1", powerUp1Count);
					powerName = "Fire";
			break;
			case 2: powerUp2Count ++;
					PlayerPrefs.SetInt("PowerUp2", powerUp2Count);
					powerName = "Heavy";					
			break;
			case 3: powerUp3Count ++;
					PlayerPrefs.SetInt("PowerUp3", powerUp3Count);
					powerName = "Slow";
			break;
		}
		var text = Instantiate(textPrefab, effectPos, Quaternion.Euler(Vector3(90,0,0)));
		text.GetComponent(TextMesh).text = "+ " + powerName + " Shot";
		Destroy(other.gameObject);
	}
}
