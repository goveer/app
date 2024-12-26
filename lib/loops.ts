interface LoopsContact {
  email: string;
  firstName?: string;
  userGroup?: string;
  mailingLists?: string;
}

export async function addToLoops(contact: LoopsContact) {
  const formBody = new URLSearchParams({
    email: contact.email,
    ...(contact.firstName && { firstName: contact.firstName }),
    ...(contact.userGroup && { userGroup: contact.userGroup }),
    ...(contact.mailingLists && { mailingLists: contact.mailingLists }),
  }).toString()

  try {
    const response = await fetch(process.env.C_LOOPS_FORM_ENDPOINT!, {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const data = await response.json()
    return { success: data.success }
  } catch (error) {
    console.error('Error adding contact to Loops:', error)
    return { error: 'Failed to add contact to mailing list' }
  }
}
