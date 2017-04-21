#pragma strict
public var buttonClip: AudioClip;
public var audioSource: AudioSource;

function PlayButtonSound()
{
	audioSource.PlayOneShot(buttonClip);
}