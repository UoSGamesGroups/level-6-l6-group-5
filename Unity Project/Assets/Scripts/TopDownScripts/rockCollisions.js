#pragma strict
public var explosion: GameObject;
public var baseDamage: float;

function OnCollisionEnter (other: Collision)
{
	if(other.gameObject.tag == "player")
	{
		var collisionDamage = baseDamage * PlayerPrefs.GetInt("currentLevel");
		other.gameObject.GetComponent.<exploreControls>().speed -= 0.1;
		other.gameObject.GetComponent.<exploreControls>().health -= collisionDamage;
		Debug.Log("Damage dealt from collision" + collisionDamage);
		Instantiate(explosion,other.gameObject.transform.position, transform.rotation);
		Handheld.Vibrate();
		Destroy (gameObject);
	}
}