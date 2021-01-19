import Event from '@ioc:Adonis/Core/Event'
import DataEvent from '@ioc:Adonis/Lucid/Database'

Event.on("db:query",DataEvent.prettyPrint)