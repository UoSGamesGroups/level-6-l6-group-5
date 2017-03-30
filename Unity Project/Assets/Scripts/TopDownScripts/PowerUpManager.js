#pragma strict
public var powerUp1Count: int;
public var powerUp2Count: int;
public var powerUp3Count: int;
public var powerUp4Count: int;
public var pickupEffect: GameObject;

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
			break;
			case 2: powerUp2Count ++;
					PlayerPrefs.SetInt("PowerUp2", powerUp2Count);
			break;
			case 3: powerUp3Count ++;
					PlayerPrefs.SetInt("PowerUp3", powerUp3Count);
			break;
			case 4: powerUp4Count ++;
					PlayerPrefs.SetInt("PowerUp4", powerUp4Count);
			break;
		}
		Destroy(other.gameObject);
	}
}
