import styles from './statusBadges.module.css'

export function StatusBadgeAssigned() {
    return (
            <div className={styles.assigenedBadge}> Assigned</div>
    )
}
export function StatusBadgeProgress() {
    return (
        <div className={styles.progressBadge}> In Progress</div>
    )
}
export function StatusBadgeSubmitted() {
    return (
        <div className={styles.submittedBadge}> Submitted</div>
    )
}
export function StatusBadgeApproved() {
    return (
        <div className={styles.approveddBadge}> Approved</div>
    )
}

export function StatusBadgeRejected() {
    return (
        <div className={styles.rejecteddBadge}> Rejected</div>
    )
}

export function StatusBadgeChanges() {
    return (
        <div className={styles.changedBadge}> change requested</div>
    )
}