import AppLayout from "../../Layouts/AppLayout";

const TYPE_META = {
    enrichment: {
        label: 'ID Lookup',
        color: 'bg-blue-500/20 text-blue-400',
    },
    db_title_fallback: {
        label: 'DB Title Match',
        color: 'bg-purple-500/20 text-purple-400',
    },
    search_fallback: {
        label: 'API Search',
        color: 'bg-yellow-500/20 text-yellow-400',
    },
};

function EnrichmentEntry({ entry }) {
    return (
        <>
            <div className="text-sm mt-2">
                <span className="text-neutral-content">Claude suggested: </span>
                <span className="font-bold">{entry.claude_title}</span>
            </div>
            {entry.error === 'invalid_id' ? (
                <div className="text-sm text-error mt-1">ID not found — recommendation rejected</div>
            ) : (
                <div className="text-sm">
                    <span className="text-neutral-content">DB returned: </span>
                    <span className={`font-bold ${entry.accepted ? '' : 'text-error'}`}>{entry.db_title}</span>
                </div>
            )}
            <div className="text-xs text-neutral-content mt-1 font-mono">{entry.imdb_id}</div>
            {entry.source && (
                <span className={`text-xs font-mono px-2 py-0.5 rounded mt-1 inline-block ${entry.source === 'db' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {entry.source === 'db' ? 'CACHED' : 'API FETCH'}
                </span>
            )}
        </>
    );
}

function DbTitleFallbackEntry({ entry }) {
    return (
        <>
            <div className="text-sm mt-2">
                <span className="text-neutral-content">Claude suggested: </span>
                <span className="font-bold">{entry.claude_title}</span>
            </div>
            <div className="text-sm">
                <span className="text-neutral-content">DB title match: </span>
                <span className="font-bold text-success">{entry.db_title}</span>
            </div>
            <div className="text-xs text-neutral-content mt-1">Resolved from local DB — no API call needed</div>
        </>
    );
}

function SearchFallbackEntry({ entry }) {
    return (
        <>
            <div className="text-sm mt-2">
                <span className="text-neutral-content">Claude suggested: </span>
                <span className="font-bold">{entry.claude_title}</span>
            </div>
            <div className="text-sm">
                <span className="text-neutral-content">Search returned: </span>
                <span className={`font-bold ${entry.accepted ? '' : 'text-error'}`}>{entry.search_title}</span>
            </div>
        </>
    );
}

export default function Logs({ entries }) {
    return (
        <AppLayout title="Recommendation Logs">
            <h1 className="text-2xl font-bold mb-2">Recommendation Logs</h1>
            <p className="text-sm text-neutral-content mb-6">
                Showing the last {entries.length} enrichment decisions — most recent first.
            </p>

            {entries.length === 0 ? (
                <p className="text-neutral-content text-sm">No recommendation logs yet. Get some recommendations first.</p>
            ) : (
                <div className="flex flex-col gap-y-3">
                    {entries.map((entry, i) => {
                        const meta = TYPE_META[entry.type] ?? TYPE_META.enrichment;
                        return (
                            <div key={i} className={`bg-neutral p-4 rounded-lg border-l-4 ${entry.accepted ? 'border-success' : 'border-error'}`}>
                                <div className="flex justify-between items-start gap-x-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-x-2 mb-1 flex-wrap gap-y-1">
                                            <span className={`text-xs font-mono px-2 py-0.5 rounded ${entry.accepted ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                                                {entry.accepted ? 'ACCEPTED' : 'REJECTED'}
                                            </span>
                                            <span className={`text-xs font-mono px-2 py-0.5 rounded ${meta.color}`}>
                                                {meta.label.toUpperCase()}
                                            </span>
                                        </div>

                                        {entry.type === 'enrichment' && <EnrichmentEntry entry={entry} />}
                                        {entry.type === 'db_title_fallback' && <DbTitleFallbackEntry entry={entry} />}
                                        {entry.type === 'search_fallback' && <SearchFallbackEntry entry={entry} />}
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className={`text-2xl font-bold ${entry.similarity >= 80 ? 'text-success' : entry.similarity >= 60 ? 'text-warning' : 'text-error'}`}>
                                            {entry.similarity}%
                                        </div>
                                        <div className="text-xs text-neutral-content">similarity</div>
                                        <div className="text-xs text-neutral-content mt-2">{entry.timestamp}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </AppLayout>
    );
}
